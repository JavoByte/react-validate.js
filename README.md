React Validated Forms
=====================

React `Form` component to automatically validate with [validate.js](https://validatejs.org)

## Installation

With `npm`

```bash
npm install --save react-validate.js
```

Or with `yarn`

```bash
yarn add react-validate.js
```

## Usage

`react-validate.js` provides 2 components: `Form` and `Input`. Each is intended to substitute `form` and `input` components, so you can pass the `props` you usually do.

To start validating, pass `constraints` prop to `Form`. Each validated item should have a matching `Input` with that name. For example, if you want to validate an `email`:

```javascript
import Form from 'react-validate.js';

function Example() {
  return (
    <Form
      constraints={
        email: {
          presence: true,
          email: true
        }
      }
    >
      <label htmlFor="email">Enter your email</label>
      <Form.Input name="email" id="email" type="email" />
    </Form>
  );
}
```

### Getting errors

To get the validation errors, pass a `onErrorsChanged` function. This function will be called each time a field is validated (`onBlur`) or the whole form is submitted. This function will receive an `errors` object as parameter with each key the validated field and an array of errors as value. For example, in the previous example in case of err, the errors object would be:

```json
{
  "email": ["Email can't be blank"],
}
```

### `select` and `textarea`
This components are supported to, just pass `select` or `textarea` as `type` prop. For the `select` tag, you should pass an `options` prop to. This prop should be an array or an object. If it's an array, each `option` will be rendered as:

```
<option value={item}>{item}</option>
```

If it's an object, it will be rendered as

```
<option value={key}>{value}</option>
```

### `onChange` caveat

If you want to have a custom `onChange` function (to allow only numbers for example) we need that your `onChange` function returns the value to be saved in the input to properly register it on the `Form`

## Example

An example is provided in the `example` folder

## TODO

- [ ] Handle array like names

## License

MIT

