# Customized Tree Click

With this module you can define which python function is called at clicking a tree
item.

## How to use

```
<field name="account_move_ids" context="{'py_onclick': 'open_in_editmode'}">
```

And in python for example:
```
def open_in_editmode(self):
    return {
        'view_type': 'form',
        'res_model': self._name,
        'res_id': self.id,
        'views': [(False, 'form')],
        'type': 'ir.actions.act_window',
        'flags': {'form': {
            'action_buttons': True,
            'initial_mode': 'edit',
        }},
        'target': 'current',
    }
```


# gimera snippet

```
- branch: ${VERSION}
  path: addons_tools/customized_tree_click
  url: git@github.com:Odoo-Ninjas/odoo-web-customized-treeclick.git
  type: integrated
```
