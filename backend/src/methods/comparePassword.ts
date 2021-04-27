import bcrypt from "bcryptjs";

export default async (password: string, realPassword: string) => {
    return await bcrypt.compare(password, realPassword);
}