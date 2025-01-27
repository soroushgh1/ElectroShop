import axios from "axios";

export const PaymentCallback = async (req, res) => {
  try {
    const { success, trackId, status, orderId } = req.query;

    if (success === '1') {
      console.log('Payment successful!');
      console.log('Track ID:', trackId);
      console.log('Status:', status);
      console.log('Order ID:', orderId);

      const verifyResponse = await axios.post("https://gateway.zibal.ir/v1/verify", {
        merchant: "zibal",
        trackId: trackId,
      });

      if (verifyResponse.data.result === 100) {
        console.log('Payment verified successfully:', verifyResponse.data);

        await axios.post('http://localhost:3000/api/order/makingpayment');

        return res.status(200).json({ message: "Payment successful, order deleted.", payment });
      } else {
        console.log('Payment verification failed:', verifyResponse.data.message);
        return res.status(400).json({ error: "Payment verification failed." });
      }
    } else {
      console.log('Payment failed or was canceled.');
      return res.status(400).json({ error: "Payment failed or was canceled." });
    }
  } catch (err) {
    console.error('Error in PaymentCallback:', err.message);
    return res.status(400).json({ error: err.message });
  }
};