import { useState } from 'react'
import './App.css'
import './pages.css'

const VIEWS = {
  HOME: 'home',
  MODE: 'mode',
  CODE_PURCHASE: 'codePurchase',
  CODE_CART: 'codeCart',
  MY_CODES: 'myCodes',
  INSTRUCTIONS: 'instructions',
  ORDER_HISTORY: 'orderHistory',
  AUTO_ACTIVATION: 'autoActivation',
  AUTO_CART: 'autoCart',
}

const CODE_OPTIONS = [
  { id: 1, value: 60, price: 50 },
  { id: 2, value: 325, price: 250 },
  { id: 3, value: 660, price: 500 },
  { id: 4, value: 1800, price: 1300 },
  { id: 5, value: 3850, price: 2700 },
  { id: 6, value: 8100, price: 5500 },
]

const AUTO_PACKS = [
  { id: 1, value: 60, price: 50 },
  { id: 2, value: 120, price: 100 },
  { id: 3, value: 180, price: 150 },
  { id: 4, value: 325, price: 250 },
  { id: 5, value: 385, price: 300 },
  { id: 6, value: 660, price: 500 },
  { id: 7, value: 720, price: 550 },
  { id: 8, value: 985, price: 750 },
  { id: 9, value: 1200, price: 900 },
  { id: 10, value: 1485, price: 1100 },
  { id: 11, value: 1800, price: 1300 },
  { id: 12, value: 2125, price: 1550 },
  { id: 13, value: 2460, price: 1800 },
  { id: 14, value: 2785, price: 2050 },
  { id: 15, value: 3125, price: 2300 },
  { id: 16, value: 3850, price: 2700 },
  { id: 17, value: 4510, price: 3200 },
  { id: 18, value: 5170, price: 3700 },
  { id: 19, value: 5830, price: 4200 },
  { id: 20, value: 6490, price: 4700 },
  { id: 21, value: 7150, price: 5200 },
  { id: 22, value: 7810, price: 5700 },
  { id: 23, value: 8470, price: 6200 },
  { id: 24, value: 9130, price: 6700 },
  { id: 25, value: 9790, price: 7200 },
  { id: 26, value: 10450, price: 7700 },
  { id: 27, value: 11110, price: 8200 },
  { id: 28, value: 11770, price: 8700 },
]

function BottomBar({ setView }) {
  const handleOpenChat = (url) => {
    window.open(url, '_blank')
  }

  return (
    <div className="bottom-bar">
      <button
        className="bottom-bar-item"
        onClick={() => setView(VIEWS.ORDER_HISTORY)}
      >
        <span className="bottom-bar-item-icon">📋</span>
        <span className="bottom-bar-item-text">История</span>
      </button>

      <button
        className="bottom-bar-item"
        onClick={() => handleOpenChat('https://t.me/+3AF4dzSsNXU0YzFi')}
      >
        <span className="bottom-bar-item-icon">⭐</span>
        <span className="bottom-bar-item-text">Отзывы</span>
      </button>

      <button
        className="bottom-bar-item"
        onClick={() => handleOpenChat('https://t.me/MISS_uc_manager')}
      >
        <span className="bottom-bar-item-icon">💬</span>
        <span className="bottom-bar-item-text">Поддержка</span>
      </button>
    </div>
  )
}

function App() {
  const [view, setView] = useState(VIEWS.HOME)
  const [codeQuantities, setCodeQuantities] = useState({})
  const [cartQuantities, setCartQuantities] = useState({ 1: 2, 2: 1 })
  const [selectedAutoPack, setSelectedAutoPack] = useState(
    AUTO_PACKS[0],
  )

  const updateCodeQuantity = (id, delta) => {
    setCodeQuantities((prev) => {
      const current = prev[id] || 0
      const newValue = Math.max(0, current + delta)
      if (newValue === 0) {
        const { [id]: removed, ...rest } = prev
        return rest
      }
      return { ...prev, [id]: newValue }
    })
  }

  const getCodeTotalPrice = () => {
    return Object.entries(codeQuantities).reduce((total, [id, qty]) => {
      const code = CODE_OPTIONS.find((c) => c.id === parseInt(id))
      return total + (code ? code.price * qty : 0)
    }, 0)
  }

  const getCodeTotalCount = () =>
    Object.values(codeQuantities).reduce((sum, qty) => sum + qty, 0)

  const updateCartQuantity = (id, delta) => {
    setCartQuantities((prev) => {
      const current = prev[id] || 0
      const newValue = Math.max(0, current + delta)
      if (newValue === 0) {
        const { [id]: removed, ...rest } = prev
        return rest
      }
      return { ...prev, [id]: newValue }
    })
  }

  const getCartTotalPrice = () => {
    return Object.entries(cartQuantities).reduce((total, [id, qty]) => {
      const code = CODE_OPTIONS.find((c) => c.id === parseInt(id))
      return total + (code ? code.price * qty : 0)
    }, 0)
  }

  const renderHome = () => (
    <div className="home-page">
      <div className="page-container">
        <div className="main-card">
          <div
            className="main-card-bg"
            style={{
              backgroundImage: `url(/img/фон мисс бот копия.jpg)`,
            }}
          ></div>
          <div className="main-card-content">
            <div className="main-card-icon">🎮</div>
            <h2 className="main-card-title">PUBG Mobile</h2>
            <p className="main-card-subtitle">Пополнение UC</p>
            <button
              className="btn btn-primary main-card-button"
              onClick={() => setView(VIEWS.CODE_PURCHASE)}
            >
              Пополнить
            </button>
          </div>
        </div>

        <div className="stars-card disabled">
          <div className="stars-card-content">
            <div className="stars-card-icon">⭐</div>
            <h3 className="stars-card-title">TG STARS</h3>
            <p className="stars-card-subtitle">Недоступно</p>
          </div>
        </div>
      </div>

      <BottomBar setView={setView} />
    </div>
  )

  const renderModeSelection = () => (
    <div className="mode-selection-page">
      <div className="page-container">
        <div className="page-header">
          <button className="back-button" onClick={() => setView(VIEWS.HOME)}>
            ←
          </button>
          <h1 className="page-title">Выберите способ</h1>
        </div>

        <div className="mode-cards">
          <div
            className="mode-card"
            onClick={() => setView(VIEWS.CODE_PURCHASE)}
          >
            <div className="mode-card-icon">🎫</div>
            <h3 className="mode-card-title">Покупка кодов</h3>
            <p className="mode-card-description">
              Получите коды для самостоятельной активации
            </p>
            <div className="mode-card-arrow">→</div>
          </div>

          <div
            className="mode-card"
            onClick={() => setView(VIEWS.AUTO_ACTIVATION)}
          >
            <div className="mode-card-icon">⚡</div>
            <h3 className="mode-card-title">Автоматическая активация</h3>
            <p className="mode-card-description">
              Пополнение через API UCodeium
            </p>
            <div className="mode-card-arrow">→</div>
          </div>
        </div>
      </div>

      <BottomBar setView={setView} />
    </div>
  )

  const renderCodePurchase = () => {
    const hasItems = getCodeTotalCount() > 0

    return (
      <div className="code-purchase-page">
        <div className="page-container">
          <div className="page-header">
            <button className="back-button" onClick={() => setView(VIEWS.HOME)}>
              ←
            </button>
            <h1 className="page-title">Покупка кодов</h1>
          </div>

          <div className="code-cards">
            {CODE_OPTIONS.map((code, index) => {
              const quantity = codeQuantities[code.id] || 0
              return (
                <div
                  key={code.id}
                  className={`code-card ${quantity > 0 ? 'selected' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="code-card-content">
                    <div className="code-card-info">
                      <h3 className="code-card-value">{code.value} UC</h3>
                      <p className="code-card-price">{code.price} ₽</p>
                    </div>
                    <div className="code-card-controls">
                      <button
                        className="code-card-btn minus"
                        onClick={() => updateCodeQuantity(code.id, -1)}
                        disabled={quantity === 0}
                      >
                        −
                      </button>
                      <span className="code-card-quantity">{quantity}</span>
                      <button
                        className="code-card-btn plus"
                        onClick={() => updateCodeQuantity(code.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <button
            className="my-codes-button"
            onClick={() => setView(VIEWS.MY_CODES)}
          >
            Мои коды
          </button>
        </div>

        {hasItems && (
          <div className="purchase-bar">
            <div className="purchase-bar-info">
              <div className="purchase-bar-total">
                <span className="purchase-bar-label">Итого:</span>
                <span className="purchase-bar-price">
                  {getCodeTotalPrice()} ₽
                </span>
              </div>
              <div className="purchase-bar-codes">
                {getCodeTotalCount()}{' '}
                {getCodeTotalCount() === 1 ? 'код' : 'кодов'}
              </div>
            </div>
            <button
              className="btn btn-primary purchase-bar-button"
              onClick={() => setView(VIEWS.CODE_CART)}
            >
              Купить
            </button>
          </div>
        )}

        <BottomBar setView={setView} />
      </div>
    )
  }

  const renderCodeCart = () => {
    const cartItems = Object.entries(cartQuantities)
      .filter(([, qty]) => qty > 0)
      .map(([id, qty]) => {
        const code = CODE_OPTIONS.find((c) => c.id === parseInt(id))
        return { ...code, quantity: qty }
      })

    const handleOpenChat = (url) => {
      window.open(url, '_blank')
    }

    return (
      <div className="code-cart-page">
        <div className="page-container">
          <div className="page-header">
            <button
              className="back-button"
              onClick={() => setView(VIEWS.CODE_PURCHASE)}
            >
              ←
            </button>
            <h1 className="page-title">Корзина</h1>
          </div>

          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <h3 className="cart-item-value">{item.value} UC</h3>
                  <p className="cart-item-price">{item.price} ₽</p>
                </div>
                <div className="cart-item-controls">
                  <button
                    className="cart-item-btn minus"
                    onClick={() => updateCartQuantity(item.id, -1)}
                  >
                    −
                  </button>
                  <span className="cart-item-quantity">{item.quantity}</span>
                  <button
                    className="cart-item-btn plus"
                    onClick={() => updateCartQuantity(item.id, 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="payment-methods">
            <h3 className="section-title">Способы оплаты</h3>
            <div className="payment-options">
              <button className="payment-option active">
                <span className="payment-icon">💳</span>
                <span className="payment-name">СБП</span>
              </button>
              <button className="payment-option">
                <span className="payment-icon">💳</span>
                <span className="payment-name">Мир / Visa / Mastercard</span>
              </button>
            </div>
          </div>

          <div className="support-section">
            <button
              className="support-button"
              onClick={() => handleOpenChat('https://t.me/MISS_uc_manager')}
            >
              💬 Тех. поддержка
            </button>
          </div>

          <div className="footer-info">
            <p className="footer-text">
              Политика конфиденциальности и пользовательское соглашение
            </p>
            <p className="footer-text">Касса: CodeePay</p>
          </div>
        </div>

        <div className="cart-bottom-bar">
          <div className="cart-total">
            <span className="cart-total-label">Итого:</span>
            <span className="cart-total-price">{getCartTotalPrice()} ₽</span>
          </div>
          <button
            className="btn btn-primary cart-pay-button"
            onClick={() => {
              alert('Переход на оплату (будет реализовано позже)')
            }}
          >
            Оплатить
          </button>
        </div>

        <BottomBar setView={setView} />
      </div>
    )
  }

  const renderMyCodes = () => {
    const [showInstructions, setShowInstructions] = useState(false)

    const codes = [
      {
        id: 1,
        code: 'ABC123XYZ456',
        value: 60,
        date: '01.12.2025',
        used: false,
      },
      {
        id: 2,
        code: 'DEF789UVW012',
        value: 325,
        date: '01.12.2025',
        used: false,
      },
      {
        id: 3,
        code: 'GHI345RST678',
        value: 60,
        date: '30.11.2025',
        used: true,
      },
    ]

    const copyToClipboard = (text) => {
      navigator.clipboard.writeText(text).then(() => {
        alert('Код скопирован!')
      })
    }

    return (
      <div className="my-codes-page">
        <div className="page-container">
          <div className="page-header">
            <button
              className="back-button"
              onClick={() => setView(VIEWS.CODE_PURCHASE)}
            >
              ←
            </button>
            <h1 className="page-title">Мои коды</h1>
          </div>

          <div className="instructions-section">
            <button
              className="instructions-button"
              onClick={() => setShowInstructions(!showInstructions)}
            >
              <span className="instructions-icon">📖</span>
              <span className="instructions-text">Как активировать коды</span>
              <span className="instructions-arrow">
                {showInstructions ? '▼' : '▶'}
              </span>
            </button>

            {showInstructions && (
              <div className="instructions-content">
                <p>1. Откройте игру PUBG Mobile</p>
                <p>2. Перейдите в раздел "Магазин"</p>
                <p>3. Выберите "Пополнить UC"</p>
                <p>4. Введите код активации</p>
                <p>5. Подтвердите активацию</p>
              </div>
            )}
          </div>

          <button
            className="full-instructions-button"
            onClick={() => setView(VIEWS.INSTRUCTIONS)}
          >
            Полная инструкция
          </button>

          {codes.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🎫</div>
              <p className="empty-text">У вас пока нет кодов</p>
            </div>
          ) : (
            <div className="codes-list">
              {codes.map((codeItem) => (
                <div
                  key={codeItem.id}
                  className={`code-item ${codeItem.used ? 'used' : ''}`}
                >
                  <div className="code-item-header">
                    <div className="code-item-info">
                      <span className="code-item-value">
                        {codeItem.value} UC
                      </span>
                      <span className="code-item-date">{codeItem.date}</span>
                    </div>
                    {codeItem.used && (
                      <span className="code-item-status">Использован</span>
                    )}
                  </div>
                  <div className="code-item-code">
                    <span className="code-text">{codeItem.code}</span>
                    <button
                      className="copy-button"
                      onClick={() => copyToClipboard(codeItem.code)}
                      disabled={codeItem.used}
                    >
                      📋
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <BottomBar setView={setView} />
      </div>
    )
  }

  const renderInstructions = () => (
    <div className="instructions-page">
      <div className="page-container">
        <div className="page-header">
          <button
            className="back-button"
            onClick={() => setView(VIEWS.MY_CODES)}
          >
            ←
          </button>
          <h1 className="page-title">Инструкция</h1>
        </div>

        <div className="instructions-content-full">
          <div className="instruction-section">
            <h2 className="instruction-title">
              Как активировать коды UC в PUBG Mobile
            </h2>

            <div className="instruction-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3 className="step-title">Откройте игру PUBG Mobile</h3>
                <p className="step-description">
                  Запустите приложение PUBG Mobile на вашем устройстве и войдите
                  в свой аккаунт.
                </p>
              </div>
            </div>

            <div className="instruction-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3 className="step-title">Перейдите в раздел "Магазин"</h3>
                <p className="step-description">
                  В главном меню игры найдите и нажмите на кнопку "Магазин"
                  (Shop).
                </p>
              </div>
            </div>

            <div className="instruction-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3 className="step-title">Выберите "Пополнить UC"</h3>
                <p className="step-description">
                  В магазине найдите опцию "Пополнить UC" или "Redeem Code"
                  (Активировать код).
                </p>
              </div>
            </div>

            <div className="instruction-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3 className="step-title">Введите код активации</h3>
                <p className="step-description">
                  Скопируйте код из раздела "Мои коды" и вставьте его в поле для
                  ввода кода.
                </p>
              </div>
            </div>

            <div className="instruction-step">
              <div className="step-number">5</div>
              <div className="step-content">
                <h3 className="step-title">Подтвердите активацию</h3>
                <p className="step-description">
                  Нажмите кнопку "Активировать" или "Подтвердить". UC будут
                  зачислены на ваш аккаунт.
                </p>
              </div>
            </div>

            <div className="instruction-note">
              <p className="note-text">
                <strong>Важно:</strong> Каждый код можно использовать только один
                раз. После активации код становится недействительным.
              </p>
            </div>
          </div>
        </div>
      </div>

      <BottomBar setView={setView} />
    </div>
  )

  const renderOrderHistory = () => {
    const [showHelp, setShowHelp] = useState(false)

    const orders = [
      {
        id: 1,
        date: '01.12.2025',
        type: 'Коды',
        amount: 150,
        status: 'Оплачено',
        codes: ['ABC123XYZ', 'DEF456UVW'],
      },
      {
        id: 2,
        date: '30.11.2025',
        type: 'Автоактивация',
        amount: 500,
        status: 'Оплачено',
        playerId: '5555555555',
      },
      {
        id: 3,
        date: '29.11.2025',
        type: 'Коды',
        amount: 250,
        status: 'Оплачено',
        codes: ['GHI789RST'],
      },
    ]

    return (
      <div className="order-history-page">
        <div className="page-container">
          <div className="page-header">
            <button
              className="back-button"
              onClick={() => setView(VIEWS.HOME)}
            >
              ←
            </button>
            <h1 className="page-title">История заказов</h1>
            <button
              className="help-button"
              onClick={() => setShowHelp(!showHelp)}
            >
              <span className="help-icon">?</span>
            </button>
          </div>

          {showHelp && (
            <div className="help-popup">
              <h3>Информация о заказах</h3>
              <p>
                Здесь отображается история всех ваших покупок. Вы можете
                просмотреть детали каждого заказа, включая коды и статус
                оплаты.
              </p>
              <p>
                Статус "Оплачено" означает, что заказ успешно обработан и коды
                доступны в разделе "Мои коды".
              </p>
            </div>
          )}

          {orders.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <p className="empty-text">У вас пока нет заказов</p>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <div className="order-info">
                      <span className="order-date">{order.date}</span>
                      <span className="order-type">{order.type}</span>
                    </div>
                    <span className="order-status оплачено">
                      {order.status}
                    </span>
                  </div>
                  <div className="order-details">
                    <p className="order-amount">Сумма: {order.amount} ₽</p>
                    {order.codes && (
                      <p className="order-codes">
                        Кодов: {order.codes.length}
                      </p>
                    )}
                    {order.playerId && (
                      <p className="order-player-id">
                        Player ID: {order.playerId}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <BottomBar setView={setView} />
      </div>
    )
  }

  const renderAutoActivation = () => (
    <div className="auto-activation-page">
      <div className="page-container">
        <div className="page-header">
          <button
            className="back-button"
            onClick={() => setView(VIEWS.MODE)}
          >
            ←
          </button>
          <h1 className="page-title">Автоматическая активация</h1>
        </div>

        <div className="auto-packs-grid">
          {AUTO_PACKS.map((pack, index) => (
            <div
              key={pack.id}
              className="auto-pack-card"
              onClick={() => {
                setSelectedAutoPack(pack)
                setView(VIEWS.AUTO_CART)
              }}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="auto-pack-content">
                <h3 className="auto-pack-value">{pack.value} UC</h3>
                <p className="auto-pack-price">{pack.price} ₽</p>
              </div>
              <div className="auto-pack-arrow">→</div>
            </div>
          ))}
        </div>
      </div>

      <BottomBar setView={setView} />
    </div>
  )

  const renderAutoCart = () => {
    const [playerId, setPlayerId] = useState('')
    const [showUidHelp, setShowUidHelp] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState('sbp')
    const [playerInfo, setPlayerInfo] = useState(null)
    const [checkingId, setCheckingId] = useState(false)

    const handleOpenChat = (url) => {
      window.open(url, '_blank')
    }

    const handleCheckId = async () => {
      if (!playerId || !playerId.startsWith('5')) {
        alert('Player ID должен начинаться с цифры 5')
        return
      }

      setCheckingId(true)
      setTimeout(() => {
        setPlayerInfo({
          nickname: `Player${playerId.slice(-4)}`,
          region: 'EU',
        })
        setCheckingId(false)
      }, 1000)
    }

    const isValidPlayerId = playerId.startsWith('5') && playerId.length >= 9

    return (
      <div className="auto-cart-page">
        <div className="page-container">
          <div className="page-header">
            <button
              className="back-button"
              onClick={() => setView(VIEWS.AUTO_ACTIVATION)}
            >
              ←
            </button>
            <h1 className="page-title">Корзина</h1>
          </div>

          <div className="selected-pack-card">
            <div className="pack-card-content">
              <h3 className="pack-card-value">{selectedAutoPack.value} UC</h3>
              <p className="pack-card-price">{selectedAutoPack.price} ₽</p>
            </div>
          </div>

          <div className="player-id-section">
            <div className="player-id-header">
              <label className="player-id-label">PUBG UID</label>
              <button
                className="help-button"
                onClick={() => setShowUidHelp(!showUidHelp)}
              >
                <span className="help-icon">?</span>
              </button>
            </div>

            {showUidHelp && (
              <div className="help-popup">
                <p>
                  Player ID можно найти в настройках игры PUBG Mobile. Обычно он
                  начинается с цифры 5 и состоит из 9-10 цифр.
                </p>
              </div>
            )}

            <div className="player-id-input-group">
              <input
                type="text"
                className="player-id-input"
                placeholder="Введите Player ID"
                value={playerId}
                onChange={(e) => {
                  setPlayerId(e.target.value)
                  setPlayerInfo(null)
                }}
              />
              <button
                className="btn btn-secondary check-id-button"
                onClick={handleCheckId}
                disabled={!isValidPlayerId || checkingId}
              >
                {checkingId ? 'Проверка...' : 'Проверить ID'}
              </button>
            </div>

            {playerInfo && (
              <div className="player-info">
                <p className="player-info-text">
                  <strong>Никнейм:</strong> {playerInfo.nickname}
                </p>
                <p className="player-info-text">
                  <strong>Регион:</strong> {playerInfo.region}
                </p>
              </div>
            )}
          </div>

          <div className="payment-methods">
            <h3 className="section-title">Способы оплаты</h3>
            <div className="payment-options">
              <button
                className={`payment-option ${
                  paymentMethod === 'sbp' ? 'active' : ''
                }`}
                onClick={() => setPaymentMethod('sbp')}
              >
                <span className="payment-icon">💳</span>
                <span className="payment-name">СБП</span>
              </button>
              <button
                className={`payment-option ${
                  paymentMethod === 'card' ? 'active' : ''
                }`}
                onClick={() => setPaymentMethod('card')}
              >
                <span className="payment-icon">💳</span>
                <span className="payment-name">Мир / Visa / Mastercard</span>
              </button>
            </div>
          </div>

          <div className="support-section">
            <button
              className="support-button"
              onClick={() => handleOpenChat('https://t.me/MISS_uc_manager')}
            >
              💬 Тех. поддержка
            </button>
          </div>

          <div className="footer-info">
            <p className="footer-text">
              Политика конфиденциальности и пользовательское соглашение
            </p>
            <p className="footer-text">Касса: CodeePay</p>
          </div>
        </div>

        <div className="cart-bottom-bar">
          <div className="cart-total">
            <span className="cart-total-label">Итого:</span>
            <span className="cart-total-price">
              {selectedAutoPack.price} ₽
            </span>
          </div>
          <button
            className="btn btn-primary cart-pay-button"
            onClick={() => {
              if (!playerId || !isValidPlayerId) {
                alert('Пожалуйста, введите корректный Player ID')
                return
              }
              alert('Переход на оплату (будет реализовано позже)')
            }}
            disabled={!isValidPlayerId}
          >
            Оплатить
          </button>
        </div>

        <BottomBar setView={setView} />
      </div>
    )
  }

  let content
  switch (view) {
    case VIEWS.HOME:
      content = renderHome()
      break
    case VIEWS.MODE:
      content = renderModeSelection()
      break
    case VIEWS.CODE_PURCHASE:
      content = renderCodePurchase()
      break
    case VIEWS.CODE_CART:
      content = renderCodeCart()
      break
    case VIEWS.MY_CODES:
      content = renderMyCodes()
      break
    case VIEWS.INSTRUCTIONS:
      content = renderInstructions()
      break
    case VIEWS.ORDER_HISTORY:
      content = renderOrderHistory()
      break
    case VIEWS.AUTO_ACTIVATION:
      content = renderAutoActivation()
      break
    case VIEWS.AUTO_CART:
      content = renderAutoCart()
      break
    default:
      content = renderHome()
  }

  return <div className="app">{content}</div>
}

export default App
