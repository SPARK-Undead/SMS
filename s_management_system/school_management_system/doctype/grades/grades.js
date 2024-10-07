// // // Copyright (c) 2024, Delon Pyle and contributors
// // // For license information, please see license.txt

frappe.ui.form.on('Grades', {
    refresh: function(frm) {
        calculate_total_and_percentage(frm);
    },
    'academic_performance_add': function(frm) {
        calculate_total_and_percentage(frm);
    },
    'academic_performance_remove': function(frm) {
        calculate_total_and_percentage(frm);
    },
    'academic_performance': {
        marks: function(frm, cdt, cdn) {
            calculate_total_and_percentage(frm);
        }
    }
});

function calculate_total_and_percentage(frm) {
    let total = 0;
    let count = 0;

    // Check if there are entries in the Academic Performance child table
    if (frm.doc.academic_performance) {
        frm.doc.academic_performance.forEach(row => {
            // Ensure to check if marks are defined and are numbers
            if (row.marks) {
                total += parseFloat(row.marks) || 0;  // Use parseFloat to handle string numbers
                count++;  // Increment the count of rows
            }
        });
    }

    // Set the total marks in the parent form
    frm.set_value('total_marks', total);

    // Calculate the percentage if count is greater than 0
    if (count > 0) {
        let percentage = (total / (count * 100)) * 100; 
        frm.set_value('percentage', parseFloat(percentage.toFixed(2))); 
        
        // Calculate the grade based on percentage
        frm.set_value('final_grade', get_grade(percentage)); 
    } else {
        frm.set_value('percentage', 0); 
        frm.set_value('final_grade', ''); 
    }
}

// Function to determine grade based on percentage
function get_grade(percentage) {
    if (percentage >= 90) {
        return 'A';
    } else if (percentage >= 80) {
        return 'B';
    } else if (percentage >= 70) {
        return 'C';
    } else if (percentage >= 60) {
        return 'D';
    } else {
        return 'F';
    }
}
