import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-validated-form';

class App extends Component {
  state = {};

  render() {
    return (
      <div className="container">
        <Form
          className="form"
          constraints={{
            name: {
              presence: true,
              length: {
                minimum: 3,
                maximum: 50,
              },
            },
            username: {
              presence: true,
              format: {
                pattern: '[a-z0-9]',
                flags: 'i',
                message: 'can only contain alphanumeric chars',
              },
              length: {
                minimum: 5,
                maximum: 20,
              },
            },
            password: {
              presence: true,
              length: {
                minimum: 3,
                maximum: 50,
              },
            },
            password_confirmation: {
              presence: true,
              equality: 'password',
            },
            gender: {
              presence: {
                message: 'is mandatory',
              },
            },
            terms: {
              presence: {
                message: 'must be accepted',
              },
            },
          }}
          onErrorsChanged={errors => this.setState({ basicExampleErrors: errors })}
        >
          <Errors errors={this.state.basicExampleErrors} />
          <div className="form-group">
            <label htmlFor="name">
              Name
            </label>
            <Form.Input className="form-control" name="name" id="name" />
          </div>
          <div className="form-group">
            <label htmlFor="username">
              Username
            </label>
            <Form.Input className="form-control" name="username" id="username" />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              Password
            </label>
            <Form.Input className="form-control" type="password" name="password" id="password" />
          </div>
          <div className="form-group">
            <label htmlFor="password_confirmation">
              Confirm your password
            </label>
            <Form.Input className="form-control" type="password" name="password_confirmation" id="password_confirmation" />
          </div>
          <div className="checkbox">
            <label htmlFor="terms">
              <Form.Input id="terms" type="checkbox" name="terms" value="1" />
              I have read terms and conditions
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="gender-male" className="radio-inline">
              <Form.Input id="gender-male" type="radio" name="gender" value="male" />
              Male
            </label>
            <label htmlFor="gender-female" className="radio-inline">
              <Form.Input id="gender-female" type="radio" name="gender" value="female" />
              Female
            </label>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </div>
        </Form>
      </div>
    );
  }
}

function Errors({
  errors,
}) {
  if (!errors || Object.keys(errors).length === 0) {
    return null;
  }
  return (
    <div className="alert alert-danger">
      {
        Object.keys(errors).map((field) => {
          const fieldErrors = errors[field];
          let error = null;
          if (Array.isArray(fieldErrors)) {
            if (fieldErrors.length > 1) {
              return (
                <ul key={field}>
                  {
                    fieldErrors.map(item => (
                      <li key={item}>{ item }</li>
                    ))
                  }
                </ul>
              );
            }
            error = fieldErrors[0];
          }
          return (
            <p key={field}>
              { error }
            </p>
          );
        })
      }
    </div>
  );
}

Errors.propTypes = {
  errors: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

Errors.defaultProps = {
  errors: null,
};

export default App;
