import { IPC, RemoteEventsFolder } from "ipc";

class IPCClient extends IPC<RemoteEvent> {
  eventLocation: Instance = RemoteEventsFolder;

  connect(object: RemoteEvent<Callback>, callback: (...args: any[]) => any): RBXScriptConnection {
    return object.OnClientEvent.Connect(callback)
  }

  fire(object: RemoteEvent<Callback>, ...args: any[]): void {
    object.FireServer(...args)
  }

  getEvent(name: string): RemoteEvent<Callback> {
    if (!this.eventMap.has(name)) {
      const out: RemoteEvent = this.eventLocation.WaitForChild(name) as RemoteEvent
      this.eventMap.set(name, out)
      return out
    }
    return this.eventMap.get(name)!
  }
}

export const ipcClient = new IPCClient()
