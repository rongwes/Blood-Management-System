import icon_analytics from '../../assets/icon_analytics.png'
import icon_blood_requests from '../../assets/icon_blood_requests.png'
import icon_donations from '../../assets/icon_donations.png'
import icon_donors from '../../assets/icon_donors.png'
import icon_facilities from '../../assets/icon_facilities.png'
import icon_inventory from '../../assets/icon_inventory.png'

export const DASHBOARD_SIDEBAR_LINKS = [
    {
		key: 'analytics',
		label: 'Analytics',
		path: '/',
		icon: icon_analytics
	},
	{
		key: 'donors',
		label: 'Donors',
		path: '/donors',
		icon: icon_donors
	}
    ,
	{
		key: 'donations',
		label: 'Donations',
		path: '/donations',
		icon: icon_donations
	}
    ,
	{
		key: 'inventory',
		label: 'Inventory',
		path: '/inventory',
		icon: icon_inventory
	}
    ,
	{
		key: 'bloodRequests',
		label: 'Blood Requests',
		path: '/bloodRequests',
		icon: icon_blood_requests
	}
    ,
	{
		key: 'facilities',
		label: 'Facilities',
		path: '/facilities',
		icon: icon_facilities
	}
]