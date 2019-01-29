import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Top extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            leftList: initializeList(0, 10),
            rightList: initializeList(10, 10),
        };
    }

    leftClick = () => {
        let obj = moveListElement(this.state.leftList, this.state.rightList, 0);
        this.setState({
            leftList: obj.fromList,
            rightList: obj.tooList,
            }
        );
    };

    rightClick = () => {
        let obj = moveListElement(this.state.rightList, this.state.leftList, 0);
        this.setState({
                leftList: obj.tooList,
                rightList: obj.fromList,
            }
        );
    };

    render() {
        return(
            <div className="center-queues">
                <div className="queues" >
                    <List
                        items = {this.state.leftList}
                    />
                </div>
                <div className="vertical">
                    <button onClick={this.leftClick}>-></button>
                    <button onClick={this.rightClick}>&lt;-</button>
                </div>
                <div className="queues">
                    <List
                        items = {this.state.rightList}
                    />
                </div>
            </div>
        )
    }
}


class List extends React.Component {

    render() {
        return (
            this.props.items.map((item) =>
                <div className="square">
                    {item}
                </div>)
        )
    }
}

// ========================================

ReactDOM.render(
    <Top/>,
    document.getElementById('root')
);

function  initializeList(startValue, size) {
    return Array.apply(null, {length: size}).map(function(value, index){
        return index + 1 + startValue;
    });
}

function moveListElement(fromList, tooList, index) {
    let element = fromList.splice(index, 1);
    tooList.push(element);
    return {
        fromList: fromList,
        tooList: tooList
    }
}


