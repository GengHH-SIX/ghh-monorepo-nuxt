interface User {
	name: string;
	age: number;
}

export function getUser(): User {
	return {
		name: 'John',
		age: 20,
	};
}

type ClassValue = string | number | null | undefined;
export const testStr: ClassValue = 'test';

type A = { a: string };
export const aObj: A = { a: 'test' };
