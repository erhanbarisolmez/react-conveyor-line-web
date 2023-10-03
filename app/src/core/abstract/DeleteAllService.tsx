abstract class DeleteAllServiceBase<T> {
    abstract deleteAll(data: T[]) : Promise<void>;
}
export default DeleteAllServiceBase;
