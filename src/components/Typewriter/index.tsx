// BSD 3-Clause License

// Copyright (c) 2022, Gerard Marquina Rubio
// All rights reserved.

// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:

// 1. Redistributions of source code must retain the above copyright notice, this
//    list of conditions and the following disclaimer.

// 2. Redistributions in binary form must reproduce the above copyright notice,
//    this list of conditions and the following disclaimer in the documentation
//    and/or other materials provided with the distribution.

// 3. Neither the name of the copyright holder nor the names of its
//    contributors may be used to endorse or promote products derived from
//    this software without specific prior written permission.

// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
// DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
// FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
// DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
// SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
// CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
// OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

/* eslint-disable no-param-reassign */
import { useEffect, useState } from 'react'

const DEFAULT_MS = 30

export interface ITypewriterProps {
  text: string | string[]
  charsPerTick?: number
  speed?: number
  loop?: boolean
  random?: number
  delay?: number
  onFinished?: () => void
  onStart?: () => void
}

export default function Typewriter({
  text,
  charsPerTick = 1,
  speed = DEFAULT_MS,
  loop = false,
  random = DEFAULT_MS,
  delay = DEFAULT_MS,
  onFinished = () => {},
  onStart = () => {},
}: ITypewriterProps) {
  const [currentStringIndex, setCurrentStringIndex] = useState(0)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  if (!Array.isArray(text)) text = [text]

  useEffect(() => {
    setTimeout(() => {
      if (currentTextIndex === 0) onStart()
      if (currentTextIndex < (text[currentStringIndex]?.length || 0)) {
        setCurrentTextIndex(currentTextIndex + charsPerTick)
      } else if (currentStringIndex < text.length - 1) {
        setTimeout(() => {
          setCurrentTextIndex(0)
          setCurrentStringIndex(currentStringIndex + 1)
        }, delay)
      } else if (loop) {
        setTimeout(() => {
          setCurrentTextIndex(0)
          setCurrentStringIndex(0)
        }, delay)
      } else {
        onFinished()
      }
    }, speed + Math.random() * random)
  })

  return <span style={{ margin: 0 }}>{(text[currentStringIndex] || '').substring(0, currentTextIndex)}</span>
}
