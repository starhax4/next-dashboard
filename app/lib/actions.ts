"use server";
import { redirect } from 'next/navigation';


export async function createInvoice(formData: FormData) {
  console.log("Action is started!");

  const rawFormData = {
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  };
  // Test it out:
  redirect('/dashboard/invoices');
  
}

