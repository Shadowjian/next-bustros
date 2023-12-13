import tkinter as tk
from tkinter import messagebox
import pandas as pd

# Load the Excel file into a DataFrame
excel_file = 'data.xlsx'
df = pd.read_excel(excel_file, engine='openpyxl')

# Function to handle Create operation
def create_record():
    name = entry_name.get()
    email = entry_email.get()

    new_record = {'Name': name, 'Email': email}
    df = df.append(new_record, ignore_index=True)

    df.to_excel(excel_file, index=False)

    messagebox.showinfo('Success', 'Record created successfully.')
    clear_fields()

# Function to handle Read operation
def read_records():
    messagebox.showinfo('Records', df.to_string(index=False))

# Function to handle Update operation
def update_record():
    selected_index = listbox.curselection()
    if not selected_index:
        messagebox.showerror('Error', 'Please select a record.')
        return

    index = selected_index[0]
    name = entry_name.get()
    email = entry_email.get()

    df.at[index, 'Name'] = name
    df.at[index, 'Email'] = email

    df.to_excel(excel_file, index=False)

    messagebox.showinfo('Success', 'Record updated successfully.')
    clear_fields()

# Function to handle Delete operation
def delete_record():
    selected_index = listbox.curselection()
    if not selected_index:
        messagebox.showerror('Error', 'Please select a record.')
        return

    index = selected_index[0]
    df.drop(index, inplace=True)

    df.to_excel(excel_file, index=False)

    messagebox.showinfo('Success', 'Record deleted successfully.')
    clear_fields()

# Function to clear input fields
def clear_fields():
    entry_name.delete(0, tk.END)
    entry_email.delete(0, tk.END)

# Create the main Tkinter window
window = tk.Tk()
window.title('User Management System')

# Create the UI components
label_name = tk.Label(window, text='Name:')
label_name.pack()
entry_name = tk.Entry(window)
entry_name.pack()

label_email = tk.Label(window, text='Email:')
label_email.pack()
entry_email = tk.Entry(window)
entry_email.pack()

button_create = tk.Button(window, text='Create', command=create_record)
button_create.pack()

button_read = tk.Button(window, text='Read', command=read_records)
button_read.pack()

listbox = tk.Listbox(window)
listbox.pack()

button_update = tk.Button(window, text='Update', command=update_record)
button_update.pack()

button_delete = tk.Button(window, text='Delete', command=delete_record)
button_delete.pack()

# Populate the listbox with existing records
for index, row in df.iterrows():
    listbox.insert(tk.END, f'{row["Name"]} - {row["Email"]}')

# Start the Tkinter event loop
window.mainloop()
