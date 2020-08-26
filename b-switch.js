class SwitchContent {
    constructor(options) {
        this.init(options);
    }

    init(options) {
        if (!options) {
            throw Error('Options is empty');
        }

        const merged = this.options = this._extendOptions(options);
        
        if (!merged.button) {
            return;
        }

        this.attr = this._createAttr();
        this._click = this._click.bind(this);

        document.addEventListener('click', this._click);
    }

    add(position) {
        this._searchButton(position);
        
        const attr = this.attr;
        const button = this.button;
        const options = this.options;
        
        if (!button) {
            return;
        }
        
        const parent = button.closest(options.parent);
        
        if (options.beforeAdd) {
            options.beforeAdd({parent, button, attr});
        }
        
        if (parent) {
            parent.classList.add(attr.parentActive);
        }
        
        if (options.buttonText.added) {
            button.textContent = options.buttonText.added;
        }
        
        button.classList.add(attr.buttonActive);
        
        if (options.afterAdd) {
            options.afterAdd({parent, button, attr});
        }
    }

    remove(position) {
        this._searchButton(position);
        
        const attr = this.attr;
        const options = this.options;
        const button = this.button;
        
        if (!button) {
            return;
        }
        
        const parent = button.closest(options.parent);
        
        if (options.beforeRemove) {
            options.beforeRemove({parent, button, attr});
        }
        
        if (parent) {
            parent.classList.remove(attr.parentActive);
        }
        
        if (options.buttonText.removed) {
            button.textContent = options.buttonText.removed;
        }
        
        button.classList.remove(attr.buttonActive);
        
        if (options.afterRemove) {
            options.afterRemove({parent, button, attr});
        }
        
        this.button = null;
    }

    switch (position) {
        this._searchButton(position);
        
        const attr = this.attr;
        const options = this.options;
        const button = this.button;
        
        if (!button) {
            return;
        }
        
        const status = button.classList.contains(attr.buttonActive);
        
        status ? this.remove(button) : this.add(button);
    }
    
    _isTypeObject(object) {
        return {}.toString.call(object).slice(8, -1).toLowerCase();
    }
    
    _searchButton(position) {
        const type = this._isTypeObject(position);
        
        if (type === 'number') {
            const sought = document.querySelectorAll(this.options.button)[position];
            
            if (sought) {
                this.button = sought;
            }
        } else if (type.includes('element')) {
            this.button = position;
        }
    }
    
    _createAttr() {
        const options = this.options;
        
        return {
            parentActive: `${options.modifier}__parent_active`,
            buttonActive: `${options.modifier}__button_active`,
        }
    }

    _click(event) {
        const target = event.target;
        const options = this.options;
        const button = target.closest(options.button);

        if (button) {
            this.button = button;
            this.switch();
        }
    }

    _extendOptions(options) {
        return Object.assign({
            parent: null,
            button: null,
            buttonText: {},
            afterAdd: null,
            beforeAdd: null,
            afterRemove: null,
            beforeRemove: null,
            modifier: 'b-switch',
        }, options);
    }
}
