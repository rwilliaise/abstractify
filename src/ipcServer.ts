import { IPC, RemoteEventsFolder } from "ipc";

class IPCServer extends IPC<RemoteEvent> {
  eventLocation: Instance = RemoteEventsFolder;

  connect(object: RemoteEvent<Callback>, callback: (...args: unknown[]) => any): RBXScriptConnection {
    return object.OnServerEvent.Connect(callback)
  }

  getEvent(name: string) {
    let event: RemoteEvent
    if (this.eventMap.has(name)) {
      event = this.eventMap.get(name) as RemoteEvent
    } else {
      const newEvent = new Instance("RemoteEvent", RemoteEventsFolder)
      newEvent.Name = name
      this.eventMap.set(name, newEvent as unknown as RemoteEvent)
      event = newEvent as unknown as RemoteEvent
    }
    return event
  }

  /**
   * Fire an event on the server.
   * @param name The name of the event to fire.
   * @param args
   * Args to pass on to the event. Supply a player as the first arg to fire to
   * a specific user.
   */
  async emit(name: string, target: Player, ...args: unknown[]) {
    this.fire(this.getEvent(name), target, ...args)
  }

  broadcast(name: string, ...args: unknown[]) {
    this.fireBroad(this.getEvent(name), ...args)
  }

  fire(object: RemoteEvent<Callback>, target: Player, ...args: unknown[]): void {
    object.FireClient(target, ...args)
  }

  fireBroad(object: RemoteEvent<Callback>, ...args: unknown[]) {
    object.FireAllClients(...args)
  }
}

export const ipcServer = new IPCServer()
