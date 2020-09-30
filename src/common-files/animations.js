export function shakeBox(element, x = 10, y = 0) {
    let transitions = [
        { transform: `translate(-${x}px, -${y}px)`},
        { transform: 'translate(0px, 0px)'},
        { transform: `translate(${x}px, ${y}px)`},
        { transform: 'translate(0px, 0px)'}
    ]
    element.animate(transitions, {
        duration: 200,
        iterations: 2,
        fill: "backwards"
    });
}

export function bubble(element, expand = 1.3, duration = 200, iterations = 1) {
    let transitions = [
        { transform: 'scale(1)'},
        { transform: `scale(${expand})`},
        { transform: 'scale(1)'},
    ]
    element.animate(transitions, {
        duration: duration,
        iterations: iterations,
        fill: "backwards",
        easing:"ease-in-out"
    });
}