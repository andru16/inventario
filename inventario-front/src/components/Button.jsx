function Button(props) {
    return (
        <button
            className={`${props.properties}  text-${props.color}-500 hover:text-white border border-${props.color}-500 hover:bg-${props.color}-600 focus:ring-4 focus:outline-none focus:ring-${props.color}-300 font-medium rounded-lg text-sm px-2 py-1 text-center me-2  dark:border-${props.color}-500 dark:text-${props.color}-500 dark:hover:text-white dark:hover:bg-${props.color}-500 dark:focus:ring-${props.color}-500`}
            {...props}
        >
            {props.children}
        </button>
    )
}

export default Button;

