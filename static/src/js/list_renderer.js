odoo.define("account_followup.open_invoice_editable", function (require) {
	"use strict";

	var ListRenderer = require("web.ListRenderer");
	ListRenderer.include({
		_renderRow: function (record) {
			let row = this._super(record);
			var self = this;
			row.addClass('o_list_no_open');
			// add click event
			row.bind({
				click: function (ev) {
					if (record.context.py_onclick) {
						var $target = $(ev.target);
						if ($target[0].tagName === "BUTTON") {
							return;
						}
						ev.preventDefault();
						ev.stopPropagation();
						self._rpc({
							model: record.model,
							method: record.context.py_onclick,
							args: [record.data.id],
							kwargs: {
							},
						}).then(function (action) {
							console.log(action);
							self.do_action(action, {
								on_close: function () {
									self.trigger_up('reload');
								},
							})
						});
					}
				}
			});
			return row
		},
	});
});