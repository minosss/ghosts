# gHosts

[![publish](https://github.com/minosss/ghosts/actions/workflows/publish.yml/badge.svg)](https://github.com/minosss/ghosts/actions/workflows/publish.yml)

![screenshot](/screenshot.png)

## What

This project is created by tauri-app tempalte `pnpm create tauri-app`

The hard drive is almost full, so...

- Smaller, build with tauri (rust)
- Simpler, no other features will be added, just merge hosts
- Supports remote hosts

Todo

- [ ] update remote hosts automatically
- [ ] edit name or url
- [ ] updater
- [ ] secure and secure

## Where

Download from following links:

- [Github Releases](https://github.com/minosss/ghosts/releases/)

## How

Install [Rust](https://www.rust-lang.org) and [Node](https://www.nodejs.org) recommend v16

The frontend ([React](https://github.com/facebook/react) + [ChakraUI](https://github.com/chakra-ui/chakra-ui)) using the build tool [Vite](https://vitejs.dev), you can found more information in the [guide](https://vitejs.dev/guide/)

Then, clone this project

```sh
git clone https://github.com/minosss/ghosts.git
```

Install dependencies, I use [pnpm](https://pnpm.io) as package manager

```sh
pnpm install
```

Start development

```sh
pnpm run tauri dev
```

Compiling... Done!

**OR**

Build and package, run

```sh
pnpm run tauri build
```

Found the package in the output directory `src-tauri/target/release/bundle`

## Tips

- need sudo password to change hosts file permissions on mac and linux `> 777 > write > 644`
- windows, I don't know how to run command with administrator, you should ensure the hosts is writable

## Thanks

- [Tauri](https://github.com/tauri-apps/tauri) Build smaller, faster, and more secure desktop applications with a web frontend. 
- [SwitchHosts](https://github.com/oldj/SwitchHosts) Switch hosts quickly
- [ChakraUI](https://github.com/chakra-ui/chakra-ui) A set of react components
- [Flaticon](https://www.flaticon.com/free-icons/consolidation) Logo downloaded from falticon
- [Feather](https://feathericons.com/) svg icons

## License

Apache-2.0
