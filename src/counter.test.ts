import { describe, it, expect, beforeEach } from 'vitest'
import { setupCounter } from './counter'

describe('setupCounter', () => {
  let mockButton: HTMLButtonElement

  beforeEach(() => {
    // HTMLButtonElementのモックを作成
    mockButton = document.createElement('button')
    document.body.appendChild(mockButton)
  })

  it('初期状態でカウンターが0に設定される', () => {
    setupCounter(mockButton)
    expect(mockButton.innerHTML).toBe('count is 0')
  })

  it('ボタンをクリックするとカウンターが1増える', () => {
    setupCounter(mockButton)
    
    mockButton.click()
    expect(mockButton.innerHTML).toBe('count is 1')
  })

  it('ボタンを複数回クリックするとカウンターが正しく増加する', () => {
    setupCounter(mockButton)
    
    mockButton.click()
    expect(mockButton.innerHTML).toBe('count is 1')
    
    mockButton.click()
    expect(mockButton.innerHTML).toBe('count is 2')
    
    mockButton.click()
    expect(mockButton.innerHTML).toBe('count is 3')
  })

  it('複数のボタンで独立してカウンターが動作する', () => {
    const button1 = document.createElement('button')
    const button2 = document.createElement('button')
    document.body.appendChild(button1)
    document.body.appendChild(button2)

    setupCounter(button1)
    setupCounter(button2)

    button1.click()
    button1.click()
    button2.click()

    expect(button1.innerHTML).toBe('count is 2')
    expect(button2.innerHTML).toBe('count is 1')
  })

  it('ボタンを10回クリックすると正しく10になる', () => {
    setupCounter(mockButton)

    for (let i = 0; i < 10; i++) {
      mockButton.click()
    }

    expect(mockButton.innerHTML).toBe('count is 10')
  })

  it('初期化後に再度setupCounterを呼び出すとカウンターがリセットされる', () => {
    setupCounter(mockButton)

    mockButton.click()
    mockButton.click()
    expect(mockButton.innerHTML).toBe('count is 2')

    // 再度setupCounterを呼び出す
    setupCounter(mockButton)
    expect(mockButton.innerHTML).toBe('count is 0')
  })

  it('再初期化後もクリックイベントが正常に動作する', () => {
    setupCounter(mockButton)
    mockButton.click()

    setupCounter(mockButton)
    mockButton.click()

    expect(mockButton.innerHTML).toBe('count is 1')
  })

  it('大量のクリック（100回）でも正しく動作する', () => {
    setupCounter(mockButton)

    for (let i = 0; i < 100; i++) {
      mockButton.click()
    }

    expect(mockButton.innerHTML).toBe('count is 100')
  })

  it('HTMLの形式が正しい（テンプレート文字列の検証）', () => {
    setupCounter(mockButton)
    mockButton.click()
    mockButton.click()
    mockButton.click()

    expect(mockButton.innerHTML).toMatch(/^count is \d+$/)
    expect(mockButton.innerHTML).toContain('count is 3')
  })
})

