import React, { useRef } from "react"
import cn from "classnames"
import { useSliderThumb, useFocusRing, VisuallyHidden, mergeProps, useNumberFormatter, useSlider } from "react-aria"
import { useSliderState } from "react-stately"
import styles from "./styles.module.scss"
import { ColorFamily } from "@dataesr/dsfr-plus"

function Thumb(props) {
  const { state, trackRef, index, name } = props
  const inputRef = React.useRef(null)
  const { thumbProps, inputProps, isDragging } = useSliderThumb(
    {
      index,
      trackRef,
      inputRef,
      name,
    },
    state
  )

  const { focusProps, isFocusVisible } = useFocusRing()
  return (
    <div
      {...thumbProps}
      className={cn(styles.thumb, {
        [styles.focus]: isFocusVisible,
        [styles.dragging]: isDragging,
      })}
      data-value={state.values[index]}
    >
      <VisuallyHidden>
        <input ref={inputRef} {...mergeProps(inputProps, focusProps)} />
      </VisuallyHidden>
    </div>
  )
}

interface RangeSliderProps {
  color: ColorFamily
  label: string
  hideLabelOutput: boolean
}
export function RangeSlider({
  label = "",
  hideLabelOutput = true,
  color = "beige-gris-galet",
  ...props
}: RangeSliderProps & any) {
  const trackRef = useRef(null)

  // Prepare slider state
  const numberFormatter = useNumberFormatter(props.formatOptions)
  const state = useSliderState({ ...props, numberFormatter })
  const { groupProps, trackProps, labelProps, outputProps } = useSlider(props, state, trackRef)

  return (
    <div className={styles["slider-container"]}>
      <div {...groupProps} className={cn(styles.slider, styles[`slider--${color}`])}>
        <div {...trackProps} ref={trackRef} className={cn(styles.track, { [styles.disabled]: state.isDisabled })}>
          <Thumb index={0} state={state} trackRef={trackRef} />
        </div>
      </div>
      {(label || !hideLabelOutput) && (
        <div className={styles["label-container"]}>
          <label {...labelProps}>{label}</label>
          {!hideLabelOutput && (
            <output {...outputProps} style={{ marginLeft: "1rem" }}>
              {state.getThumbValueLabel(0)}
            </output>
          )}
        </div>
      )}
    </div>
  )
}
