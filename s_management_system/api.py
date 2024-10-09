# import frappe
# from frappe import _

# @frappe.whitelist()
# def get_students(class_name):
#     class_name = frappe.db.sql(f""" SELECT name FROM `tabStudent List` WHERE class='{class_name}' """, as_dict=True)
#     return class_name