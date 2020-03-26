import { Formik, Field, Form } from 'formik'

/**
 * 기본 폼
 */
const FormikForm = () => {
  return (
    <Formik
      initialValues={{
        username: '',
      }}
      onSubmit={(values, actions) => {
        console.log(`onSubmit`, values)
        actions.setSubmitting(false)
      }}>
      {({ values, isSubmitting }) => {
        return (
          <Form>
            <div className="field">
              <label>label</label>
              <Field
                as="input"
                name="username"
                type="text"
                value={values.username}
                placeholder="username"></Field>
            </div>
            <button type="submit" disabled={isSubmitting}>
              저장하기
            </button>
          </Form>
        )
      }}
    </Formik>
  )
}
