#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::Manager;

mod app;
mod hosts;

// TODO clean code, and emit hosts state
async fn check() -> Vec<String> {
	// read hosts.json
	let list = hosts::read_hosts().await;

	let mut patchs: Vec<String> = vec![];
	for item in list {
		// filter, remote and it is enabled
		if item.kind == "remote" && item.enable.unwrap_or(false) == true && item.url.is_some() {
			let interval = item.interval.unwrap_or(30);
			let time = item.updated_at.unwrap_or(0);
			let now = std::time::SystemTime::now().duration_since(std::time::SystemTime::UNIX_EPOCH).expect("system time get current millis failed").as_millis();

			// check if the hosts need to be updated
			if (now - time) >= interval * 60000 {
				let url = item.url.unwrap().clone();
				let content = hosts::request(url).await;

				if let Some(content) = content {
					// save the content or not
					let updated = hosts::update_hosts_content(item.id.as_str().to_string(), content);
					if let Ok(updated) = updated {
						if updated {
							patchs.push(item.id.as_str().to_string());
						}
					}
				}
			}
		}
	}

	patchs
}

#[tokio::main]
async fn main() {
	tauri::async_runtime::set(tokio::runtime::Handle::current());

    let context = tauri::generate_context!();
	let pkg = context.package_info();

    tauri::Builder::default()
        .system_tray(app::create_system_tray(pkg))
        .on_system_tray_event(app::handle_system_tray_event)
        .menu(app::create_menu(pkg))
		.invoke_handler(tauri::generate_handler![])
		.on_window_event(|event| match event.event() {
			tauri::WindowEvent::CloseRequested { api, .. } => {
				if event.window().label().to_string() == "main" {
					// hide main window
					event.window().hide().unwrap();
					api.prevent_close();
				}
			}
			_ => {}
		})
		.setup(|app| {
			// 1min
			let mut interval = tokio::time::interval(tokio::time::Duration::from_secs(60));
			let main_window = app.get_window("main").unwrap();

			tokio::spawn(async move {
				loop {
					// await 1min
					interval.tick().await;
					let updated = check().await;
					if !updated.is_empty() {
						// emit event to all windows
						// TODO handle hosts state in backend
						main_window.emit_all("auto_updated", updated).unwrap();
					}
				}
			});

			Ok(())
		})
        .run(context)
        .expect("error while running tauri application");
}
