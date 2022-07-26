use std::{fs};
use tauri::api;
use serde::{Deserialize, Serialize};
use tauri::api::http::{ClientBuilder, HttpRequestBuilder, ResponseType};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Hosts {
	pub id: String,
	pub name: String,
	pub kind: String,
	pub url: Option<String>,
	pub enable: Option<bool>,
	pub interval: Option<u128>,
	pub updated_at: Option<u128>,
}

#[derive(Serialize, Deserialize)]
struct HostsList(Vec<Hosts>);

pub async fn read_hosts() -> Vec<Hosts> {
	let config = api::path::config_dir().unwrap();
	let hosts_file = config.join("com.kagabase.ghosts").join("hosts.json");
	let json = api::file::read_string(hosts_file).unwrap();

	let list: Vec<Hosts> = serde_json::from_str(json.as_str()).unwrap();

	list
}

pub fn update_hosts_content(id: String, contents: Vec<u8>) -> std::io::Result<bool> {
	let config = api::path::config_dir().unwrap();
	let hosts_file = config.join("com.kagabase.ghosts").join("data").join(id);
	let pre_contents = fs::read(&hosts_file).unwrap();

	if contents != pre_contents {
		fs::write(&hosts_file, contents)?;
		return Ok(true);
	}

	Ok(false)
}

pub async fn request(url: String) -> Option<Vec<u8>> {
	let client = ClientBuilder::new().build().unwrap();
	let request = HttpRequestBuilder::new("GET", url).unwrap().response_type(ResponseType::Binary);

	let response = client.send(request).await;

	if let Ok(response) = response {
		let bytes = response.bytes().await;
		if let Ok(bytes) = bytes {
			return Some(bytes.data);
		}
	}

	None
}
