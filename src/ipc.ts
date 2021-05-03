import { ReplicatedStorage, RunService } from "@rbxts/services"

export let RemoteEventsFolder: Instance
if (RunService.IsServer()) {
  RemoteEventsFolder = ReplicatedStorage.FindFirstChild('AbstractifyEvents') || new Instance("Folder", ReplicatedStorage)
  RemoteEventsFolder.Name = "AbstractifyEvents"
} else {
  RemoteEventsFolder = ReplicatedStorage.WaitForChild('AbstractifyEvents')
}

/**  */
export abstract class IPC<T extends Instance> {

  abstract eventLocation: Instance

  eventMap: Map<string, T> = new Map()

  async on(name: string, callback: (...args: any[]) => any) {
    for (const object of this.eventLocation.GetChildren()) {
      this.eventMap.set(object.Name, object as unknown as T)
    }
    return this.connect(this.getEvent(name), callback)
  }

  async emit(name: string, ...args: any[]) {
    this.fire(this.getEvent(name), args)
  }

  /** Can yield. Gets the event or creates the event at `name` */
  abstract getEvent(name: string): T;
  abstract connect(object: T, callback: (...args: any[]) => any): RBXScriptConnection
  abstract fire(object: T, ...args: any[]): void
}
