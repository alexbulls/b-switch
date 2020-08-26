const Block = new SwitchContent({
    parent: '.block',
    button: '.block__more',
    modifier: 'block',
    buttonText: {
        added: 'Hide',
        removed: 'More',
    },
    beforeAdd: (q) => {
        console.log(q);
    },
});

const button = document.getElementsByClassName('block__more')[1];

Block.add(0);

setTimeout(() => {
    Block.switch(button);
}, 1000);