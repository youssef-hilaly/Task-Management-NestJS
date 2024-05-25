// docker run --name postgress-nest -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres

export enum TaskStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'INPROGRESS',
    DONE = 'DONE',
}