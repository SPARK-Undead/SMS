// Copyright (c) 2024, Delon Pyle and contributors
// For license information, please see license.txt


frappe.ui.form.on('Classes', {
    class_name: function(frm) {
        // Check if a class name has been selected
        if (frm.doc.class_name) {
            // Clear the existing student list in the child table
            frm.clear_table("students_list");  

            // Fetch the list of students based on the selected class
            frappe.call({
                method: 'frappe.client.get_list',
                args: {
                    doctype: 'Student',  // The doctype from which to retrieve student records
                    filters: {
                        'class': frm.doc.class_name  // Filter by the selected class name
                    },
                    fields: ['name', 'name1']  // Fetch the document ID (name) and student name (name1)
                },
                callback: function(r) {
                    // Check if the response contains valid data
                    if (r.message && Array.isArray(r.message)) {
                        if (r.message.length > 0) {
                            // Populate the child table with the fetched student records
                            r.message.forEach(function(student) {
                                var row = frm.add_child("students_list");  // Add a new row to the "students_list" child table
                                // Assign the fetched data to the child table fields
                                row.student_id = student.name;  
                                row.student_name = student.name1;  
                            });

                            // Refresh the child table to show the updated records
                            frm.refresh_field("students_list");
                        }
                    }
                },
                error: function(err) {
    
                    console.error("Error fetching students:", err);  // Log any error
                }
            });
        }
    }
});
