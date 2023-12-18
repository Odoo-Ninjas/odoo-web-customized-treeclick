/** @odoo-module **/
debugger;

import { registry } from "@web/core/registry";
import { ListRenderer } from "@web/views/list/list_renderer";
import { listView } from "@web/views/list/list_view";
import { patch } from '@web/core/utils/patch';
import { useService } from "@web/core/utils/hooks";

patch(ListRenderer.prototype, "onCellClickedCustomizedTreeClickSetup", {
	setup() {
		this._super(...arguments);
		this.rpc = useService('orm');
		this.actionService = useService('action');
	}
})
patch(ListRenderer.prototype, "onCellClickedCustomizedTreeClick", {
	async onCellClicked(record, column, ev) {
		const _super = this._super.bind(this);
		var self = this;

		if (record.context.py_onclick) {
			var $target = $(ev.target);
			let id = record.data.id;
			let action = await this.rpc.call(record.resModel, record.context.py_onclick, [id], {context: record.context});

			if (action) {
				this.actionService.doAction(action, {
					onClose: async (ev) => {
						await record.model.root.load();
						record.model.notify();
					}
				});
				return;
			}
		}
		_super(...arguments);
	}
});