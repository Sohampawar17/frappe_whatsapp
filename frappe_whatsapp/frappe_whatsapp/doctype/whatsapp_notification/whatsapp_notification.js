// Copyright (c) 2022, Shridhar Patil and contributors
// For license information, please see license.txt

frappe.ui.form.on('WhatsApp Notification', {
	refresh: function(frm) {
		frm.trigger("load_template")
	},
	template: function(frm){
		frm.trigger("load_template")
	},
	load_template: function(frm){
		frappe.db.get_value(
			"WhatsApp Templates",
			frm.doc.template,
			["template", "header_type"],
			(r) => {
				console.log(r)
				if (r && r.template) {
					frm.set_value('header_type', r.header_type)
					frm.refresh_field("header_type")
					if (r.header_type == 'DOCUMENT'){
						frm.toggle_display("custom_attachment", true);
						frm.toggle_display("attach_document_print", true);
						if (!frm.doc.custom_attachment){
							frm.set_value("attach_document_print", 1)
						}
					}else{
						frm.toggle_display("custom_attachment", false);
						frm.toggle_display("attach_document_print", false);
						frm.set_value("attach_document_print", 0)
						frm.set_value("custom_attachment", 0)
					}

					frm.refresh_field("custom_attachment")
					console.log(frm.doc.custom_attachment)

					frm.set_value("code", r.template);
					frm.refresh_field("code")
				}
			}
		)
	},
	custom_attachment: function(frm){
		console.log(frm.doc.custom_attachment)
		if(frm.doc.custom_attachment && frm.doc.header_type == 'DOCUMENT'){
			frm.set_df_property('attach', 'reqd', frm.doc.custom_attachment)
			frm.set_df_property('file_name', 'reqd', frm.doc.custom_attachment)
		}else{
			frm.set_df_property('attach', 'reqd', !frm.doc.custom_attachment)
			frm.set_df_property('file_name', 'reqd', !frm.doc.custom_attachment)
		}

		// frm.toggle_display("attach_document_print", !frm.doc.custom_attachment);
		if(frm.doc.header_type){
			frm.set_value("attach_document_print", !frm.doc.custom_attachment)
		}
	},
	attach_document_print: function(frm){
		console.log(frm.doc.header_type)
		// frm.toggle_display("custom_attachment", !frm.doc.attach_document_print);
		if(frm.doc.header_type == 'DOCUMENT'){
			frm.set_value("custom_attachment", !frm.doc.attach_document_print)
		}
	}
});
