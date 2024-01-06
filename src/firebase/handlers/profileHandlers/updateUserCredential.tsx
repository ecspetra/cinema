import { auth } from '@/firebase/config'
import {
	EmailAuthProvider,
	reauthenticateWithCredential,
	updateEmail,
	updatePassword,
} from 'firebase/auth'
import { updateUserInStorage } from '@/firebase/handlers/profileHandlers/updateUserInStorage'
import { IProfileEditCredentialFormData } from '@/components/Profile/hooks/useProfileEditCredentialFormReducer'

export const updateUserCredential = async (
	formData: IProfileEditCredentialFormData
) => {
	const currentUser = auth.currentUser!
	const currentUserId = currentUser?.uid
	const oldEmail = currentUser?.email!
	const updateFields = {
		email: formData.email.value,
	}

	const credential = EmailAuthProvider.credential(
		oldEmail,
		formData.oldPassword.value
	)

	await reauthenticateWithCredential(currentUser!, credential).then(
		async () => {
			await updateEmail(currentUser!, formData.email.value)
			await updatePassword(currentUser!, formData.newPassword.value)
			await updateUserInStorage(updateFields, currentUserId)
		}
	)
}
