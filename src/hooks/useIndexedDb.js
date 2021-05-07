import Dexie from "dexie"

const db = new Dexie("hot-candidates")

db.version(1).stores({ users: "id,name,type,*identifiedCompanies" })

const useIndexedDb = () => db

export default useIndexedDb
