#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::api::shell;
use tauri::{
  // Needed for macOS: AboutMetadata
  AboutMetadata, CustomMenuItem, Manager, Menu, MenuEntry, MenuItem, Submenu, WindowBuilder,
  WindowUrl,
};

fn main() {
  let ctx = tauri::generate_context!();

  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![])
    .setup(|app| {
      let _window = WindowBuilder::new(app, "main", WindowUrl::default())
        .title("Sheets")
        .inner_size(800.0, 550.0)
        .min_inner_size(400.0, 200.0)
        .build()
        .expect("Unable to create window");
      Ok(())
    })
    .menu(Menu::with_items([
      #[cfg(target_os = "macos")]
      MenuEntry::Submenu(Submenu::new(
        &ctx.package_info().name,
        Menu::with_items([
          MenuItem::About(ctx.package_info().name.clone(), AboutMetadata::default()).into(),
          MenuItem::Separator.into(),
          MenuItem::Services.into(),
          MenuItem::Separator.into(),
          MenuItem::Hide.into(),
          MenuItem::HideOthers.into(),
          MenuItem::ShowAll.into(),
          MenuItem::Separator.into(),
          MenuItem::Quit.into(),
        ]),
      )),
      MenuEntry::Submenu(Submenu::new(
        "File",
        Menu::with_items([
          CustomMenuItem::new("import", "Import").into(),
          MenuItem::Separator.into(),
          CustomMenuItem::new("preferences", "Preferences").into(),
          MenuItem::Separator.into(),
          CustomMenuItem::new("quit", "Quit").accelerator("CmdOrControl+Q").into(),
        ]),
      )),
      MenuEntry::Submenu(Submenu::new(
        "Edit",
        Menu::with_items([
          MenuItem::Undo.into(),
          MenuItem::Redo.into(),
          #[cfg(target_os = "macos")]
          MenuItem::Separator.into(),
          MenuItem::Cut.into(),
          MenuItem::Copy.into(),
          MenuItem::Paste.into(),
          #[cfg(target_os = "macos")]
          MenuItem::Separator.into(),
          MenuItem::SelectAll.into(),
          #[cfg(target_os = "macos")]
          MenuItem::Separator.into(),
          CustomMenuItem::new("save", "Save").accelerator("CmdOrControl+S").into(),
          MenuItem::Separator.into(),
          CustomMenuItem::new("defines", "Defines").accelerator("CmdOrControl+D").into(),
          CustomMenuItem::new("deposits", "Deposits").into()
        ]),
      )),
      #[cfg(target_os = "macos")]
      MenuEntry::Submenu(Submenu::new(
        "View",
        Menu::with_items([MenuItem::EnterFullScreen.into()]),
      )),
      #[cfg(target_os = "macos")]
      MenuEntry::Submenu(Submenu::new(
        "Window",
        Menu::with_items([MenuItem::Minimize.into(), MenuItem::Zoom.into()]),
      )),
      // You should always have a Help menu on macOS because it will automatically
      // show a menu search field
      MenuEntry::Submenu(Submenu::new(
        "Help",
        Menu::with_items([
          CustomMenuItem::new("repository", "Repository").into(),
          CustomMenuItem::new("about", "About").accelerator("F1").into()
        ]),
      )),
    ]))
    .on_menu_event(|event| {
      let event_name = event.menu_item_id();
      match event_name {
        "quit" => {
          std::process::exit(0);
        }
        "repository" => {
          let url = "https://github.com/icabetong/sheets".to_string();
          shell::open(&event.window().shell_scope(), url, None).unwrap();
        }
        _ => {}
      }
    })
    .run(ctx)
    .expect("error while running tauri application");
}
