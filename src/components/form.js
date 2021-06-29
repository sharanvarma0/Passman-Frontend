// This function component defines a simple Form component for use in auth Component. All the fields and names are passed down as props when rendered.
// This seems to be a rather stupid way of doing things like rendering forms. I shall figure out the right way in time. As of now, This inefficient hack works.

function Form(props) {
    return (
        <div>
          {props.message}
          <form onSubmit={props.handleSubmit}>
            {props.field1}: <input type="text" id={props.id1} /><br />
            {props.field2}: <input type="text" id={props.id2} /><br />
            {props.field3}: <input type="text" id={props.id3} /><br />
            <button type="submit">{props.submitText}</button><br />
          </form>
        </div>
    );
}

export default Form;
