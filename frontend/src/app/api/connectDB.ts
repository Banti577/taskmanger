import dbConnect from "@/lib/mongodb";
import { NextResponse } from 'next/server';

export default async function handler() {
  try {
    await dbConnect();

    console.log('database is connected')
    return NextResponse.json({ message: 'Database connected successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'server error' }, { status: 500 });
  }
}




