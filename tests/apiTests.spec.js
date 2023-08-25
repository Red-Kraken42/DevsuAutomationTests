import { test, expect } from '@playwright/test';

const currentDate = new Date();

// Extract the year, month, day, hour, minutes, and seconds
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1;
const day = currentDate.getDate();
const hour = currentDate.getHours();
const minutes = currentDate.getMinutes();
const seconds = currentDate.getSeconds();

// Create a numeric value using the format: YYYYMMDDHHMMSS
const numericValue = parseInt(
    `${year}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}${hour.toString().padStart(2, '0')}${minutes.toString().padStart(2, '0')}${seconds.toString().padStart(2, '0')}`
);

const dinammicUserName = "ricardo" + numericValue
const user = {
    username: dinammicUserName,
    password: "osegueda"
}

test('Create a user', async ({ request }) => {
    const response = await request.post('https://api.demoblaze.com/signup', { data: user });
    const responseData = await response.json();
    const jsonString = JSON.stringify(responseData);
    expect(jsonString).toBe('""')
    console.log(jsonString);
})

test('Try to create a user again', async ({ request }) => {
    const response = await request.post('https://api.demoblaze.com/signup', { data: user });
    const responseData = await response.json();
    const jsonString = JSON.stringify(responseData);
    expect(jsonString).toContain('This user already exist.')
    console.log(jsonString);
})

test('Login a user', async ({ request }) => {
    const response = await request.post('https://api.demoblaze.com/login', { data: user });
    const responseData = await response.json();
    const jsonString = JSON.stringify(responseData);
    expect(jsonString).toContain('Auth_token')
    console.log(jsonString);
})

test('Login a user with wrong password', async ({ request }) => {
    const userWithWrongPassword = { ...user, password: "wrongpassword" };
    const response = await request.post('https://api.demoblaze.com/login', { data: userWithWrongPassword });
    const responseData = await response.json();
    const jsonString = JSON.stringify(responseData);
    expect(jsonString).toContain('Wrong password.')
    console.log(jsonString);
})