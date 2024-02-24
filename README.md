# abstractify
<a href="https://raja.rocks/projects/U100P0404A00.html"><img alt="Static Badge" src="https://img.shields.io/badge/raja.rocks-U100P0404A00-lightgray?style=flat-square"></a>

Roblox networking similar to many event based systems found in TypeScript and JavaScript. Slightly based off of Electron and their implementation of IPC.

## Example
```typescript
// SERVER
import { ipcServer } from '@rbxts/abstractify'
import { Players } from '@rbxts/services'

print('Hello, world! This message is from the server!')

ipcServer.on('test_message', (player, msg) => {
  print(`${player.DisplayName} has sent a message: ${msg}`)
})

Players.PlayerAdded.Connect((player) => {
  ipcServer.emit('test_message', 'Welcome to this server!')
  ipcServer.broadcast('test_message', `${player.DisplayName} has joined the server!`)
})
```

```typescript
// CLIENT
import { ipcClient } from '@rbxts/abstractify'

ipcClient.on('test_message', (msg) => {
  print(`Server sent a message: ${msg}`)
})

ipcClient.emit('test_message', 'Hi, server!')
```
