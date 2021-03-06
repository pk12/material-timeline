import React from 'react';
import { mount, configure, shallow } from 'enzyme';
import Timeline from './Timeline';
import TimelineItem from '../TimelineItem/TimelineItem'
import { directions } from '../enums/enums'
import { render } from '@testing-library/react';


import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Timeline', () => {
  let props;
  let itemProps;
  let component;
  let elementType;

  const isLeft = (item, index) => {
    return true;
  }

  const isNotLeft = (item, index) => {
    return false;
  }

  const createTimelineItem = (props) => {
    return (
      <TimelineItem
        {...props}
      />
    )
  }

  beforeEach(() => {
    props = {
      yearBackgroundColor: '#fafafa'
    };

    itemProps = {
      titleChildren: (<div></div>),
      yearBackgroundColor: '#fafafa',
      yearColor: 'white',
      cardContentChildren: (<div></div>),
      cardHeaderChildren: (<div></div>),
      iconContent: (<div></div>),
      cardMediaProps: { src: '' },
      expandableCardContent: true,
      padTo: true,
      hasDivider: true,
    }

  });


  it('Should render on the left-to-right (Directions.RIGHT) side based on isLeft', () => {
    props = {
      isLeft: isLeft,
      isOneWay: false,

    }

    component = mount(<Timeline {...props}>
      {createTimelineItem(itemProps)}
    </Timeline>)
    const item = component.find(TimelineItem)
    
    const generatedProps = {
      isOneWay: item.prop('isOneWay'),
      direction: item.prop('direction')
    }

    expect(generatedProps.isOneWay === props.isOneWay
      && generatedProps.direction === directions.RIGHT).toEqual(true)
  })

  it('Should render on the right side based on isLeft', () => {
    props = {
      isLeft: isNotLeft,
      isOneWay: false,

    }

    component = mount(<Timeline {...props}>
      {createTimelineItem(itemProps)}
    </Timeline>)

    const item = component.find(TimelineItem)
    const generatedProps = {
      direction: item.prop('direction'),
      isOneWay: item.prop('isOneWay')
    }

    //For the arrow direction
    expect(generatedProps.direction === directions.LEFT).toEqual(true)
  })


  //TODO: test if <li> is rendered correctly with its classes
  it('Should render <li> element', () => {
    props = {
      isLeft: isLeft,
      isOneWay: false

    }
    elementType = HTMLLIElement

    const { container } = render(<Timeline {...props}>
      {createTimelineItem(itemProps)}
    </Timeline>)

    expect(container.firstChild.firstChild instanceof elementType).toEqual(true)

  })

  it('Should render on <li> element with Left Direction class', () => {
    props = {
      isLeft: isLeft,
      isOneWay: false

    }

    const { container } = render(<Timeline {...props}>
      {createTimelineItem(itemProps)}
    </Timeline>)

    expect(container.firstChild.firstChild.classList.toString().includes('leftDirection')).toEqual(true)

  })

  it('Should render on <li> element with Right Direction class', () => {
    props = {
      isLeft: isNotLeft,
      isOneWay: false

    }

    const { container } = render(<Timeline {...props}>
      {createTimelineItem(itemProps)}
    </Timeline>)

    expect(container.firstChild.firstChild.classList.toString().includes('rightDirection')).toEqual(true)

  })

  //TODO: test if one way the elements are rendered on the correct side
  it('Should render on the Left side based on isOneWay and props.side', () => {
    props = {
      isOneWay: true,
      side: directions.LEFT

    }

    component = mount(<Timeline {...props}>
      {createTimelineItem(itemProps)}
    </Timeline>)

    const item = component.find(TimelineItem)
    const generatedProps = {
      direction: item.prop('direction'),
      isOneWay: item.prop('isOneWay')
    }

    expect(generatedProps.direction === directions.LEFT
      && generatedProps.isOneWay).toEqual(true)

  })

  it('Should render on the Right side based on isOneWay and props.side', () => {
    props = {
      isOneWay: true,
      side: directions.RIGHT

    }

    component = mount(<Timeline {...props}>
      {createTimelineItem(itemProps)}
    </Timeline>)

    const item = component.find(TimelineItem)
    const generatedProps = {
      direction: item.prop('direction'),
      isOneWay: item.prop('isOneWay')
    }

    expect(generatedProps.direction === directions.RIGHT
      && generatedProps.isOneWay).toEqual(true)

  })

  //TODO: test if the <li> are correctly wrapped from the wrap by function
  it('Should render on the left side based on isOneWay and props.side', () => {
    elementType = HTMLDivElement
    const wrapWith = (item, index) => {
      return (
        <div className='wrappingElement'>{item}</div>
      )
    }

    props = {
      isOneWay: true,
      side: directions.LEFT,
      wrapItem: wrapWith

    }

    const { container } = render(<Timeline {...props}>
      {createTimelineItem(itemProps)}
    </Timeline>)

    expect(container.firstChild.firstChild instanceof elementType).toEqual(true)

  })

  it('Should pass True to isStackedImage prop', () => {
    props = {
      isLeft: isNotLeft,
      isOneWay: false,
      stackedImages: true,

    }

    component = mount(<Timeline {...props}>
      {createTimelineItem(itemProps)}
    </Timeline>)

    const item = component.find(TimelineItem)
    const generatedProps = {
      isStackedImage: item.prop('isStackedImage')
    }

    //For the arrow direction
    expect(generatedProps.isStackedImage).toEqual(true)
  })

  it('Should keep isStackedImage value passed directly to the TimelineItem', () => {
    props = {
      isLeft: isNotLeft,
      isOneWay: false,
    }

    component = mount(<Timeline {...props}>
      {createTimelineItem({
        ...itemProps,
        isStackedImage: true
      })}
    </Timeline>)

    const item = component.find(TimelineItem)
    const generatedProps = {
      isStackedImage: item.prop('isStackedImage')
    }

    //For the arrow direction
    expect(generatedProps.isStackedImage).toEqual(true)
  })

  it('should remove styles that can break the component', () => {
    props = {
      isLeft: isNotLeft,
      isOneWay: false,
      style: {
        listStyleType: 'lao'
      }
    }

    component = mount(<Timeline {...props}>
      {createTimelineItem({
        ...itemProps,
        isStackedImage: true
      })}
    </Timeline>)

    const item = component.find(Timeline)
    const generatedProps = {
      style: item.prop('style')
    }

    //For the arrow direction
    expect(generatedProps.style.listStyleType).toEqual(undefined)
  })

});
