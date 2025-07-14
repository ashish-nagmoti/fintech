import { NextRequest, NextResponse } from "next/server";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

// POST: Add a transaction (demo)
export async function POST(req: NextRequest) {
  const data = await req.json();
  const docRef = await addDoc(collection(db, "transactions"), data);
  return NextResponse.json({ id: docRef.id });
}

// GET: List all transactions (demo)
export async function GET() {
  const snapshot = await getDocs(collection(db, "transactions"));
  const transactions = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return NextResponse.json(transactions);
}
