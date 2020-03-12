import React,{Component} from "react";

class Dropdown extends Component{
    constructor(props){
        super(props);

        this.state={
            tigger : ['hover'],
            name : 'xsNav hide'
        };

        this.bindEvents=this.bindEvents.bind(this);
        this.mouserLeave=this.mouserLeave.bind(this);
        this.mouseEnter=this.mouseEnter.bind(this);
        this.showOrhide=this.showOrhide.bind(this);
        this.clickFn=this.clickFn.bind(this);
        this.showOrhide=this.showOrhide.bind(this);
        this.toggleShowHide=this.toggleShowHide.bind(this);
    }

    static getDerivedStateFromProps(props,state){
        state.tigger=[...props.tigger];

        return true;
    }

    componentWillUnmount(){
        document.removeEventListener('click',this.toggleShowHide);
    }

    bindEvents(){
        let {tigger}=this.state;
        let {mouseEnter,mouserLeave,clickFn}=this;
        
        let eventObj={};

        tigger.forEach(item=>{
            if(item==='hover'){
                eventObj['onMouseEnter']=mouseEnter;
                eventObj['onMouseLeave']=mouserLeave;
            }

            if(item==='click'){
                eventObj['onClick']=clickFn;
                document.addEventListener('click',this.toggleShowHide);
            }
        })

        return React.Children.map(this.props.children,item=>{
            return React.cloneElement(item,eventObj);
        });
    }

    mouseEnter(){
        //...some code...
    }

    mouserLeave(){
        //...some code...
    }

    clickFn(){
        this.showOrhide();
    }

    toggleShowHide(ev){
        let {name}=this.state;
        let {elem}=this.props;
        let event=ev||window.event;

        let onff=true;

        event.path.forEach(item=>{
            if(item.nodeName&&item.classList&&item.classList.contains('dropdown-wrap')){
                onff=false;
            }
        })

        if(onff){
            if(name.indexOf('show')!==-1){
                name='xsNav hide';
                elem.current.classList.remove('active');
            }
        }

        this.setState({
            name
        })
    }

    showOrhide(){
        let {name}=this.state;
        let {elem}=this.props;

        if(name.indexOf('show')!==-1){
            name='xsNav hide';
            elem.current.classList.remove('active');
        }else{
            
            name='xsNav show';
            elem.current.classList.add('active');
        }

        this.setState({
            name
        })
    }

    render(){
        let {placement,overlay}=this.props;
        let {name}=this.state;
        let {bindEvents}=this;

        overlay=React.Children.map(overlay,item=>{
            return React.cloneElement(item,{
                name
            })
        });

        return (
            <div className={'drop-menu '+placement}>
                {bindEvents()}
                {overlay}
            </div>
        )
    }
}

export default Dropdown;