import React, { useState } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';

const FAQ = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqs = [
    {
      question: 'How do I create an account?',
      answer: 'Creating an account is simple. Click on the "Sign In" button on the top right corner of the homepage. Choose your preferred third-party login option from Google, Microsoft, GitHub, Facebook, or Twitter. Follow the prompts to sign in using your selected service. Once authenticated, your account will be created, and you can start using the marketplace immediately.',
    },
    {
      question: 'How can I list an item for sale?',
      answer: 'To list an item for sale, log in to your account and go to the "Sell Products" section. Provide detailed information about your item, including a title, description, price, and high-quality images. Select the appropriate category and condition of the item. After reviewing your details, click "Add Product" to list your item on the marketplace.',
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We do not support direct payments on the platform. Users should handle payments individually between buyers and sellers. Ensure to communicate clearly and use trusted payment methods such as credit cards, PayPal, or bank transfers to complete transactions securely.',
    },
    {
      question: 'Can I return an item I purchased?',
      answer: 'As our platform only facilitates information exchange between users, we do not manage returns directly. All purchases and returns must be handled between the buyer and seller. Please communicate with the seller regarding their return policy and the process for returning an item.',
    },
    {
      question: 'How do I contact customer support?',
      answer: 'First, check our chatbot for help by clicking the chat icon at the bottom right corner of the website. If you need further assistance, you can send an email to honglei9423@gmail.com. Our team is here to help with any inquiries or issues you may have.',
    },
  ];

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="max-w-5xl flex flex-col items-center justify-center bg-white text-black mx-auto my-14">
      <p className="text-2xl font-bold mb-6 border-b-2 border-gray-300 pb-2">Frequently Asked Questions</p>
      <div className="w-full">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4">
            <button
              className="text-xl font-semibold focus:outline-none flex justify-between items-center w-full border border-gray-300 p-4 rounded-lg"
              onClick={() => toggleExpand(index)}
            >
              {faq.question}
              {expandedIndex === index ? (
                <FaChevronDown className="ml-2" />
              ) : (
                <FaChevronRight className="ml-2" />
              )}
            </button>
            {expandedIndex === index && (
              <div className="mt-2 text-lg p-4">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
