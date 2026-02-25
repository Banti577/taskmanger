import { Document} from 'mongoose';

export interface MUser extends Document{
fullName: string,
email: string, 
password: string,
gender: string,
}

