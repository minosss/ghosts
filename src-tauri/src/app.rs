use tauri::{
    AppHandle, CustomMenuItem, Manager, Menu, RunEvent,
    SystemTray, SystemTrayEvent, SystemTrayMenu, SystemTrayMenuItem, WindowEvent, Wry,
	PackageInfo
};

//
pub fn create_menu(pkg: &PackageInfo) -> Menu {
    Menu::os_default(&pkg.name.to_string())
}

pub fn create_system_tray(pkg: &PackageInfo) -> SystemTray {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let hide = CustomMenuItem::new("toggle".to_string(), "Toggle");

	let version = CustomMenuItem::new("version".to_string(), std::format!("{} v{}", pkg.name, pkg.version)).disabled();
    let check_for_updates = CustomMenuItem::new("update".to_string(), "Check for Updates...").disabled();

    let tray_menu = SystemTrayMenu::new()
        .add_item(hide)
		.add_item(version)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(check_for_updates)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(quit);

    SystemTray::new().with_menu(tray_menu)
}

pub fn handle_system_tray_event(app: &AppHandle<Wry>, event: SystemTrayEvent) {
    match event {
        SystemTrayEvent::LeftClick {
            position: _,
            size: _,
            ..
        } => {
            // println!("click tray");
			// show window?
        }
        SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
            "quit" => app.exit(0),
            "toggle" => {
                let menu_item = app.tray_handle().get_item(&id);
                let window = app.get_window("main").unwrap();
                let title = if window.is_visible().unwrap() {
                    window.hide().unwrap();
                    "Show"
                } else {
                    window.show().unwrap();
                    window.set_focus().unwrap();
                    "Hide"
                };
                menu_item.set_title(title).unwrap();
            }
            _ => {}
        },
        _ => {}
    }
}

pub fn handle_app_event(app: &AppHandle<Wry>, event: RunEvent) {
    match event {
        // Application is ready (triggered only once)
        RunEvent::Ready => {}
        RunEvent::WindowEvent {
            label,
            event: WindowEvent::CloseRequested { api, .. },
            ..
        } => {
            if label == "main" {
                let window = app.get_window(&label).unwrap();
                window.hide().unwrap();
                //
                let id = String::from("toggle");
                let menu_item = app.tray_handle().get_item(&id);
                menu_item.set_title("Show").unwrap();

                api.prevent_close();
            }
        }
        // RunEvent::ExitRequested { api, .. } => {
        // 	api.prevent_exit();
        // }
        _ => {}
    }
}
