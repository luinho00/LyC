import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import HomeSection from './HomeSection'
import InventorySection from '../components/InventorySection'
import KitchenSection from '../components/KitchenSection'
import LoyaltySection from '../components/LoyaltySection'
import ReportsSection from '../components/ReportsSection'
import SocialMediaSection from './SocialMediaSection'
import DigitalOrdersSection from './DigitalOrdersSection'

type ModuleKey = 'home' | 'inventory' | 'kitchen' | 'loyalty' | 'reports' | 'social' | 'orders'

export default function Dashboard({
  user,
  onLogout,
}: {
  user: string
  onLogout: () => void
}) {
  const [activeModule, setActiveModule] = useState<ModuleKey>('home')

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'home':
        return <HomeSection />
      case 'inventory':
        return <InventorySection />
      case 'kitchen':
        return <KitchenSection />
      case 'loyalty':
        return <LoyaltySection />
      case 'reports':
        return <ReportsSection />
      case 'social':
        return <SocialMediaSection />
      case 'orders':
        return <DigitalOrdersSection />
      default:
        return <HomeSection />
    }
  }

  return (
    <div className="dashboard-layout">
      <Navbar user={user} onLogout={onLogout} />
      <div className="dashboard-container">
        <Sidebar activeModule={activeModule} onSelect={setActiveModule} />
        <div className="dashboard-content">
          {renderActiveModule()}
        </div>
      </div>
    </div>
  )
}
