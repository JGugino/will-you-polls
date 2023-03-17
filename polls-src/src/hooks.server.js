import { connectPostgres} from '$db/postgres_connect';
//import { createNewUser, deleteUser } from '$db/user_helper';

connectPostgres();
console.log('Connected to database');