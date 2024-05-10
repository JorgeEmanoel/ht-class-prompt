## ht-class-prompt


## Installation

Run the following command:

```
npm i ht-class-prompt
```

## Usage


```javascript
const ht = require('ht-class-prompt')


ht.getStudentData({
    onConfirm: function () {
        // do something
    },
    onGiveUp: function () {
        // do something
    },
    classByAge: function (age) {
        return 'Some Class'
    }
})

```
