import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import { Button } from 'antd';
import { CloseSquareOutlined } from '@ant-design/icons';
const Color = ({ children, onChange, ...restFiledProps }) => {
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const [color, setColor] = useState();
    const styles = {
        color: {
            display: 'inline-block',
            width: '36px',
            height: '14px',
            borderRadius: '2px',
            backgroundColor: color
            // background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
        },
        swatch: {
            padding: '5px 5px 2px',
            background: '#fff',
            borderRadius: '1px',
            boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
            display: 'inline-block',
            cursor: 'pointer',
        },
        popover: {
            position: 'absolute',
            zIndex: '2',
        },
        cover: {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
        },
    };
    const handleClick = () => {
        setDisplayColorPicker(true);
    };
    const handleClose = () => {
        setDisplayColorPicker(false);
    };
    const triggerChange = (value) => {
        setColor(value);
        onChange?.(value);
    };
    return (
        <>
            {color ?
                <div onClick={handleClick}>
                    <div style={styles.swatch}>
                        <div style={styles.color} />
                    </div>
                    <CloseSquareOutlined style={{ color: 'red', fontSize: 15, marginLeft: 10 }} onClick={() => triggerChange()} />
                </div>
                :
                <Button type="primary" size={'small'} onClick={handleClick}>请选择颜色</Button>
            }
            {
                displayColorPicker && <div style={styles.popover}>
                    <div
                        style={styles.cover}
                        onClick={handleClose}
                    />
                    <SketchPicker
                        {...restFiledProps}
                        color={color}
                        onChange={(e) => triggerChange(e.hex)}
                    />
                </div>
            }
        </>
    );
};

export default Color;
