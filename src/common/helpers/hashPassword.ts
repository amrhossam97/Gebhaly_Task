import * as bcrypt from 'bcrypt';

export const hashPassword = async (pass: string) => {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(pass, salt);
    return hash;
};

export const validatePassword = async (
    password: string,
    hashedPass: string,
): Promise<boolean> => {
    const isMatch = await bcrypt.compare(password, hashedPass);
    return isMatch;
};
