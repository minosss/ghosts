#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod app;
mod cron;

fn main() {
    let context = tauri::generate_context!();
	let pkg = context.package_info();
    #[allow(unused_mut)]
    let mut app = tauri::Builder::default()
        .system_tray(app::create_system_tray(pkg))
        .on_system_tray_event(app::handle_system_tray_event)
        .menu(app::create_menu(pkg))
		.invoke_handler(tauri::generate_handler![
			cron::add_cron_item,
			cron::remove_cron_item
		])
        .build(context)
        .expect("error while running tauri application");

    app.run(app::handle_app_event);
}
