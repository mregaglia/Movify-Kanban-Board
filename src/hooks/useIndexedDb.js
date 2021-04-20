import Dexie from "dexie"

const db = new Dexie("hot-candidates")

db.version(1).stores({ users: "++id,referenceId,name,color" })

const useIndexedDb = () => db

export default useIndexedDb
