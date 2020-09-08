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

        // NOTE: onSubmit 콜백이 비동기라면 아래 코드를 실행할 필요가 없다.
        // https://jaredpalmer.com/formik/docs/api/formik#onsubmit-values-values-formikbag-formikbag--void--promiseany
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
