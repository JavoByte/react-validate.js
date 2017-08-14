import React from 'react';
import PropTypes from 'prop-types';
import validate from 'validate.js';

class Form extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    constraints: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    externalErrors: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    onErrorsChanged: PropTypes.func,
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    children: null,
    constraints: {},
    externalErrors: {},
    onErrorsChanged: (errors) => {
      console.error(errors);
    },
    onSubmit: (event, data) => {
      event.preventDefault();
      console.warn('Unhandled submit', data);
    },
  };

  static childContextTypes = {
    values: PropTypes.object,
    registerValue: PropTypes.func,
    validateField: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.validateField = this.validateField.bind(this);
    this.registerValue = this.registerValue.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  state = {
    input: {},
    errors: {},
  };

  getChildContext() {
    return {
      values: this.state.input,
      registerValue: this.registerValue,
      validateField: this.validateField,
    };
  }

  componentWillReceiveProps({ externalErrors }) {
    if (externalErrors && Object.keys(externalErrors).length > 0) {
      this.props.onErrorsChanged(externalErrors);
    }
  }

  onSubmit(event) {
    const {
      constraints,
      onErrorsChanged,
      onSubmit,
    } = this.props;
    // somehow get values
    const values = this.state.input;
    const errors = validate(values, constraints);
    if (errors) {
      event.preventDefault();
      this.setState({
        errors,
      }, () => onErrorsChanged(errors));
    } else {
      onSubmit(event, values);
    }
  }

  registerValue(field, value) {
    this.setState(prevState => ({
      input: {
        ...prevState.input,
        [field]: value,
      },
    }));
  }

  validateField(field) {
    const { constraints, onErrorsChanged } = this.props;
    const values = this.state.input;
    const allErrors = validate(values, constraints) || {};
    const errors = allErrors[field];
    if (errors) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          [field]: errors,
        },
      }), () => {
        onErrorsChanged(this.state.errors);
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        {
          this.props.children
        }
      </form>
    );
  }
}

export default Form;
